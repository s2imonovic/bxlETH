import { lazy } from "react";

const StakingPage = lazy(
  () =>
    import(
      "../pages/StakingPage/StakingPage" /* webpackChunkName: "StakingPage Chunk" */
    )
);
const ErrorPage = lazy(
  () =>
    import(
      "../pages/ErrorPage/ErrorPage" /* webpackChunkName: "ErrorPage Chunk" */
    )
);

export { StakingPage, ErrorPage };
