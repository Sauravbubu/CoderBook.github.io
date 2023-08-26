import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Skeleton } from "@chakra-ui/react/dist/chakra-ui-react.cjs";

const FrontendPart = lazy(() => import("../../../Components/FrontendPart"));
const TabPannel = lazy(() => import("../TabPannel"));
const Account = lazy(() => import("../Account"));
const Addquestion = lazy(() => import("../Addquestion"));
const Completed = lazy(() => import("../Completed"));
const Home = lazy(() => import("../Home"));
const OwnStore = lazy(() => import("../OwnStore"));
const ProjectsPage = lazy(() => import("../machineCoding"));
const QuizComponent = lazy(() => import("../quiz"));
const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Skeleton />}>
            <Home />
          </Suspense>
        }
      />
      {/* ... */}
      <Route
        path="/javascript"
        element={
          <PrivateRoute>
            <Suspense fallback={<Skeleton />}>
              <FrontendPart type="javascript" />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        path="/react"
        element={
          <PrivateRoute>
            <Suspense fallback={<Skeleton />}>
              <FrontendPart type="react" />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        path="/ui_machine_coding"
        element={
          <PrivateRoute>
            <Suspense fallback={<Skeleton />}>
              <ProjectsPage />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        path="/dsa"
        element={
          <Suspense fallback={<Skeleton />}>
            <TabPannel />
          </Suspense>
        }
      />
      {/* ... */}
      <Route
        path="/bookmarked"
        element={
          <Suspense fallback={<Skeleton />}>
            <Account />
          </Suspense>
        }
      />
      <Route
        path="/addquestion"
        element={
          <Suspense fallback={<Skeleton />}>
            <Addquestion />
          </Suspense>
        }
      />
      <Route
        path="/jsquiz"
        element={
          <Suspense fallback={<Skeleton />}>
            <QuizComponent endPoint="jsquizlist" />
          </Suspense>
        }
      />
      <Route
        path="/Javabackendquiz"
        element={
          <Suspense fallback={<Skeleton />}>
            <QuizComponent endPoint="java-backend" />
          </Suspense>
        }
      />
      <Route
        path="/ownstore"
        element={
          <Suspense fallback={<Skeleton />}>
            <OwnStore />
          </Suspense>
        }
      />
      <Route
        path="/completed"
        element={
          <Suspense fallback={<Skeleton />}>
            <Completed />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
