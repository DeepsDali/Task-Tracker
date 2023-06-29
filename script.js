import { addEventListener } from "./JS/addEventListener.js";
import { removeTask } from "./JS/deleteTask.js";
addEventListener();

setInterval(removeTask,1000);  // Need to replace this with calling remove task every time new item is added. Or better pass a const with all delbtns to removeTask
