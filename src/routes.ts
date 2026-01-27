import { createBrowserRouter } from "react-router";
import { Login } from "./components/Login";
import { Root } from "./components/Root";
import { TodayView } from "./components/TodayView";
import { MedicationList } from "./components/MedicationList";
import { AddMedication } from "./components/AddMedication";
import { MedicationDetail } from "./components/MedicationDetail";
import { RefillRequest } from "./components/RefillRequest";
import { Calendar } from "./components/Calendar";
import { Communications } from "./components/Communications";
import { Settings } from "./components/Settings";
import { NotFound } from "./components/NotFound";
import { ScreenshotDemo } from "./pages/ScreenshotDemo";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/screenshot-demo",
    Component: ScreenshotDemo,
  },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: TodayView },
      { path: "medications", Component: MedicationList },
      { path: "medications/add", Component: AddMedication },
      { path: "medications/:id", Component: MedicationDetail },
      { path: "medications/:id/refill", Component: RefillRequest },
      { path: "calendar", Component: Calendar },
      { path: "communications", Component: Communications },
      { path: "settings", Component: Settings },
      { path: "*", Component: NotFound },
    ],
  },
]);