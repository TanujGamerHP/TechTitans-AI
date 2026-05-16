import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CinematicBackground } from "@/components/CinematicBackground";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { AdminGuard } from "@/pages/admin/AdminGuard";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PortfolioPage from "@/pages/PortfolioPage";
import CaseStudy from "@/pages/CaseStudy";
import AboutUs from "@/pages/AboutUs";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";
import ServicePage from "@/pages/ServicePage";
import SubServicePage from "@/pages/SubServicePage";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ProjectForm from "@/pages/admin/ProjectForm";

const queryClient = new QueryClient();

function PublicRouter() {
  return (
    <>
      <CinematicBackground />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/portfolio" component={PortfolioPage} />
        <Route path="/portfolio/:id" component={CaseStudy} />
        <Route path="/about" component={AboutUs} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-conditions" component={TermsConditions} />
        <Route path="/services/:id" component={ServicePage} />
        <Route path="/services/:serviceId/:subServiceId" component={SubServicePage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function AdminRouter() {
  return (
    <Switch>
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard">
        {() => <AdminGuard><AdminDashboard /></AdminGuard>}
      </Route>
      <Route path="/admin/projects/new">
        {() => <AdminGuard><ProjectForm /></AdminGuard>}
      </Route>
      <Route path="/admin/projects/:id/edit">
        {() => <AdminGuard><ProjectForm /></AdminGuard>}
      </Route>
    </Switch>
  );
}

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <WouterRouter base={base}>
            <Switch>
              <Route path="/admin">
                {() => <AdminRouter />}
              </Route>
              <Route path="/admin/:rest*">
                {() => <AdminRouter />}
              </Route>
              <Route>
                {() => <PublicRouter />}
              </Route>
            </Switch>
          </WouterRouter>
        </AdminAuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
