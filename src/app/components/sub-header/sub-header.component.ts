import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Call from 'src/app/core/models/call.model';
import AgentFacade from '../../core/facades/agent.facade';
import CallFacade from '../../core/facades/call.facade';

@Component({
  selector: 'app-gc-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export default class SubHeaderComponent implements OnInit, OnDestroy {
  public notifier = new Subject();
  public agentSelectForm: FormGroup;
  public showslider = false;

  constructor(public agents: AgentFacade, public calls: CallFacade, private fb: FormBuilder, private router: Router) {
    this.agentSelectForm = this.fb.group({
      agentName: new FormControl(''),
      callTime: new FormControl({ value: '', disabled: true })
    });
  }

  ngOnInit(): void {
    this.calls.activeAgentCalls$
    .pipe(takeUntil(this.notifier))
    .subscribe((calls: Call[]) => {
      // Navigate user to selection pending page if user reselect the agent and call 
      if (!(calls && calls.length)) {
        this.router.navigate(['']);
      }

      // reset call field when user change the agent
      this.agentSelectForm.patchValue({
        callTime: { value: '', disabled: true }
      })
    });
  }

  selectAgent(event: any): void {
    // hide slider if there is no call id selected
    this.showslider = false;
    
    // once user selects the agent name than enable call id selection else hide it 
    if (event.value) {
      this.agents.setActiveAgent(event.value);
      this.agentSelectForm.controls['callTime'].enable();
    }
    else {
      this.agentSelectForm.controls['callTime'].disable();
    }
  };

  selectCall(event: any): void {
    // show sensitivity slider only when call id is selected 
    this.showslider = true;
    this.calls.selectCall(event.value);
    // once agent and call id is selected, navigate to analyzer page
    this.router.navigate(['analyzer', event.value]);
  }

  setMatchingPercentage (machtValue: number) {
    this.calls.setMatchingPercentage(machtValue)
  }

  ngOnDestroy() {
    this.notifier.next('')
    this.notifier.complete()
  }

}
