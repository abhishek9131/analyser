import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import AgentFacade from '../../facades/agent.facade';
import CallFacade from '../../facades/call.facade';

@Component({
  selector: 'app-gc-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export default class SubHeaderComponent {
  agentSelectForm: FormGroup;
  showslider = false;

  constructor(public agents: AgentFacade, public calls: CallFacade, private fb: FormBuilder, private router: Router) {
    this.agentSelectForm = fb.group({
      agentName: new FormControl(''),
      callTime: new FormControl({ value: '', disabled: true }),
    });
    this.router.navigate([''])
  }

  public selectAgent(event: any): void {
    this.showslider = false;
    if (event.value) {
      this.agents.setActiveAgent(event.value);
      this.agentSelectForm.controls['callTime'].enable();
    }
    else {
      this.agentSelectForm.controls['callTime'].disable();
    }
  };

  public selectCall(event: any): void {
    this.router.navigate(['analyzer', event.value])
    this.showslider = true;
    this.calls.selectCall(event.value);
  }

  setMatchingPercentage (machterValue: number) {
    this.calls.setMatchingPercentage(machterValue)
  }
}
