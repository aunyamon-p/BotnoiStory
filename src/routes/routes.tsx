import { Home } from "src/home";
import { CreateStoryPage, ErrorPage, ResultsPage } from "src/pages";

export enum Paths {
  HOME = "/",
  RESULTS = "/results",
}

export const routes = [
  {
    path: Paths.HOME,
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CreateStoryPage />,
      },
      {
        path: Paths.RESULTS,
        element: <ResultsPage />,
      },
    ],
  },
];
