// External Dependencies
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Internal Dependencies
import { ChatWrapperComponent } from "./on-demand/chat-wrapper/chat-wrapper.component";
/**
 * Chat routes
 */
const routes: Routes = [
  {
    path: "",
    redirectTo: "chat",
    pathMatch: "full",
  },
  {
    path: "chat",
    component: ChatWrapperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
