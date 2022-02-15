import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import AgentFacade from 'src/app/core/facades/agent.facade';
import CallFacade from 'src/app/core/facades/call.facade';
import Transcript from 'src/app/core/models/transcript.model';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AnalyzerComponent implements OnInit, AfterViewInit {
  public dataSource: any[] = [];
  public dataSourceRep: any[] = [];
  public selectedSensitivity: number = 0;
  public hoveredScript = '';
  public tooltipText = '';
  public similarity = {
    achieved: 0,
    expected: 0
  };
  public realSimilarity: number = 0;
  public activeTranscript: Transcript = new Transcript();

  constructor(
    public agents: AgentFacade,
    public calls: CallFacade,
    private ref: ChangeDetectorRef
  ) {
  }

  public ngAfterViewInit(): void {
  }

  public getTooltipText(transcript: any) {
    if (transcript.matching_sentence && (transcript.similarity * 100) > this.selectedSensitivity) {
      const matchingScript = this.activeTranscript.script.find(script => script.sentence === transcript.matching_sentence)
      this.tooltipText =  `${transcript.similarity * 100}% matching with line # "${matchingScript && matchingScript.order + 1}"
      "${transcript.matching_sentence}"`
    }
    else {
      this.tooltipText = '';
    }
  }

  public ngOnInit(): void {
    this.dataSource = MOCK_DATA();
    this.dataSourceRep = MOCK_DATA().slice(-25);
    this.calls.activeTranscript$.subscribe(activeTranscript => {
      this.activeTranscript = activeTranscript
    });

    this.calls.matchingPercentage$.subscribe(matchingPercentage => {
      this.selectedSensitivity = matchingPercentage;
      this.scriptCovered(matchingPercentage);
      this.ref.markForCheck();
    });
  }

  public selectAgent(event: any): void {
    this.agents.setActiveAgent(event.target?.value);
  };

  public selectCall(event: any): void {
    this.calls.selectCall(event.target?.value);
  }

  isMatchingScript(transcript: any) {
    return (transcript.similarity * 100) > this.selectedSensitivity && transcript.matching_sentence;
  }

  scriptCovered(sensitivity: number) {
    const transcript = this.activeTranscript ? this.activeTranscript.transcript : [];
    const script = this.activeTranscript ? this.activeTranscript.script : [];
    if (transcript.length && script.length) {
      const totalTransScripts = transcript.length;
      const totalScripts = script.length;
      const achievedTranscript = transcript
        .filter(x => (x && x.similarity) ? x.similarity * 100 >= sensitivity : false)
        .length;
      const achievedScripts = script
        .filter(x => (x && x.similarity) ? x.similarity * 100 >= sensitivity : false)
        .length;
      this.similarity = {
        achieved: Math.round(achievedTranscript / totalTransScripts * 100),
        expected: Math.round(achievedScripts / totalScripts * 100)
      }
    }
  }

  updateExpectedSimilarity(sensitivity: number) {
    if (this.activeTranscript && this.activeTranscript.script) {
      const scriptsCount = this.activeTranscript.script.length
      const coveredScripts = this.activeTranscript.script
        .filter(x => (x && x.similarity) ? x.similarity * 100 >= sensitivity : false)
        .length
      this.realSimilarity = Math.round(coveredScripts / scriptsCount * 100)
    }
  }

  getSpeakersName(chanel: any, call: any) {
    const speakerName = call.getSpeaker(chanel);
    return speakerName ? speakerName.split(' ')[0] : 'unknown';
  }

  getDuration(transcript: any) {
    if (transcript) {
      const duration = transcript.timeTo - transcript.timeFrom
      const minutes = Math.floor(duration / 60);
      const seconds = duration - (minutes * 60);
      let timerFormat = new Date();
      timerFormat.setHours(0);
      timerFormat.setMinutes(minutes);
      timerFormat.setSeconds(seconds);
      return timerFormat;
    }
    return 0;
  }

  onHighlight(transcript: any, scriptHovered: boolean) {
    this.getTooltipText(transcript)
    if (scriptHovered && (transcript.similarity * 100) > this.selectedSensitivity && transcript.matching_sentence) {
      this.hoveredScript = transcript.matching_sentence;
      this.ref.markForCheck();
    }
    else {
      this.hoveredScript = '';
      this.ref.markForCheck();
    }

  }

}

const MOCK_DATA = () => {
  const DATA: any[] = [];
  const SPEAKERS: string[] = [
    'Harvey',
    'Luke'
  ];

  let currentTime = 30;

  for (let i = 0; i < 100; i++) {
    const min = Math.floor(currentTime / 60);
    const sec = Math.floor(currentTime - min * 60);

    DATA.push({
      time: `${(
        '0' + min
      ).slice(-2)}:${(
        '0' + sec
      ).slice(-2)}`,
      speaker: SPEAKERS[Math.floor(Math.random() *
        (
          SPEAKERS.length
        ))],
      sentence: `This is a sample sentence #${i + 1}`
    });

    currentTime +=
      (
        Math.random() * 10
      ) + 5;
  }

  return DATA;
};
