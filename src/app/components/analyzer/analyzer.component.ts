import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import AgentFacade from 'src/app/core/facades/agent.facade';
import CallFacade from 'src/app/core/facades/call.facade';
import Script from 'src/app/core/models/script.model';
import Transcript from 'src/app/core/models/transcript.model';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AnalyzerComponent implements OnInit {
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

  public getTooltipText(transcript: Script) {
    // text to show on tooltip
    if (transcript.matching_sentence && transcript.similarity && (transcript.similarity * 100) > this.selectedSensitivity) {
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

    this.calls.activeTranscript$.subscribe((activeTranscript: Transcript) => {
      this.activeTranscript = activeTranscript
    });

    // method to change the script covered percentage on basis of slider value
    this.calls.matchingPercentage$.subscribe((matchingPercentage: number) => {
      this.selectedSensitivity = matchingPercentage;
      this.scriptCovered(matchingPercentage);
      this.ref.markForCheck();
    });
  }

  // method to highlight the similar scripts
  isMatchingScript(transcript: Script) {
    return (transcript.similarity && ((transcript.similarity * 100) > this.selectedSensitivity) && transcript.matching_sentence);
  }

  // method to find the matching scripts in both the tables
  scriptCovered(sensitivity: number) {
    const transcript = this.activeTranscript ? this.activeTranscript.transcript : [];
    const script = this.activeTranscript ? this.activeTranscript.script : [];
    // calculate the percentage of script is matching in both the tables
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

  // method to calculate expected similarity percentage
  updateExpectedSimilarity(sensitivity: number) {
    if (this.activeTranscript && this.activeTranscript.script) {
      const scriptsCount = this.activeTranscript.script.length
      const coveredScripts = this.activeTranscript.script
        .filter(x => (x && x.similarity) ? x.similarity * 100 >= sensitivity : false)
        .length
      this.realSimilarity = Math.round(coveredScripts / scriptsCount * 100)
    }
  }

  getSpeakersName(chanel: number, call: Transcript) {
    // show only initial name of the speaker in the table
    const speakerName = call.getSpeaker(chanel);
    return speakerName ? speakerName.toString().split(' ')[0] : 'unknown';
  }

  // method to get the duration of script
  getDuration(transcript: Script) {
    if (transcript && transcript.timeTo && transcript.timeFrom) {
      const duration = transcript.timeTo - transcript.timeFrom
      const minutes = Math.floor(duration / 60);
      const seconds = duration - (minutes * 60);
      // logic to set the duration as per requirement
      let timerFormat = new Date();
      timerFormat.setHours(0);
      timerFormat.setMinutes(minutes);
      timerFormat.setSeconds(seconds);
      return timerFormat;
    }
    return 0;
  }

  // method to highlight the scripts
  onHighlight(transcript: Script, scriptHovered: boolean) {
    this.getTooltipText(transcript);
    if (scriptHovered && transcript.similarity && (transcript.similarity * 100) > this.selectedSensitivity && transcript.matching_sentence) {
      this.hoveredScript = transcript.matching_sentence;
      // need to run chnage detection manually as onPush strategy is used in this component
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
