// External Dependencies
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
/**
 * Default routes
 */
const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./chat/chat.module").then((m) => m.ChatModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
