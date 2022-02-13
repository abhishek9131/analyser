import {Component, TemplateRef} from '@angular/core';
import AgentFacade from '../../facades/agent.facade';
import CallFacade from '../../facades/call.facade';

@Component({
  selector:    'app-gc-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls:   ['./sub-header.component.scss']
})
export default class SubHeaderComponent {
  constructor(public agents: AgentFacade, public calls: CallFacade,) {
  }
  public selectAgent(event: any): void {debugger
    this.agents.setActiveAgent(event.target?.value);
  };

  public selectCall(event: any): void {debugger
    this.calls.selectCall(event.target?.value);
  }
}
