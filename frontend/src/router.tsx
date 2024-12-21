import { Navigate, RouteObject } from "react-router-dom";
import ErrorPage from "./error-page";
import LandingPage from "./LandingPage";
import { useEffect, useState } from "react";
import { useGetMe } from "./queries/useGetMe";

const Root = () => {
	const [redirectPath, setRedirectPath] = useState<string | null>(null);
	const me = useGetMe();

	useEffect(() => {
		if (me.isFetched) {
			setRedirectPath(me.isSuccess ? "/manage/events" : "/auth/login");
		}
	}, [me.isFetched]);

	if (redirectPath) {
		return <Navigate to={redirectPath} replace={true} />;
	}

	return null; // Render vacío mientras se resuelve la redirección
};

export const router: RouteObject[] = [
	// Ruta para la landing page
	{
		path: "/",
		element: <LandingPage />,
		errorElement: <ErrorPage />,
	},
	// Ruta para autenticación
	{
		path: "auth",
		async lazy() {
			const AuthLayout = await import("./components/layouts/AuthLayout");
			return { Component: AuthLayout.default };
		},
		errorElement: <ErrorPage />,
		children: [
			{
				path: "login",
				async lazy() {
					const Login = await import("./components/routes/auth/Login");
					return { Component: Login.default };
				},
			},
			{
				path: "register",
				async lazy() {
					const Register = await import("./components/routes/auth/Register");
					return { Component: Register.default };
				},
			},
			{
				path: "forgot-password",
				async lazy() {
					const ForgotPassword = await import("./components/routes/auth/ForgotPassword");
					return { Component: ForgotPassword.default };
				},
			},
			{
				path: "reset-password/:token",
				async lazy() {
					const ResetPassword = await import("./components/routes/auth/ResetPassword");
					return { Component: ResetPassword.default };
				},
			},
			{
				path: "accept-invitation/:token",
				async lazy() {
					const AcceptInvitation = await import("./components/routes/auth/AcceptInvitation");
					return { Component: AcceptInvitation.default };
				},
			},
		],
	},
	// Ruta para gestionar eventos
	{
		path: "manage",
		errorElement: <ErrorPage />,
		async lazy() {
			const DefaultLayout = await import("./components/layouts/DefaultLayout");
			return { Component: DefaultLayout.default };
		},
		children: [
			{
				path: "events/:eventsState?",
				async lazy() {
					const Dashboard = await import("./components/routes/events/Dashboard");
					return { Component: Dashboard.default };
				},
			},
			{
				path: "organizer/:organizerId/events?/:eventsState?",
				async lazy() {
					const OrganizerDashboard = await import("./components/routes/organizer/OrganizerDashboard");
					return { Component: OrganizerDashboard.default };
				},
			},
			{
				path: "account",
				async lazy() {
					const ManageAccount = await import("./components/routes/account/ManageAccount");
					return { Component: ManageAccount.default };
				},
			},
		],
	},
	// Ruta pública para eventos
	{
		path: "/e/:eventId/:eventSlug",
		async lazy() {
			const EventHomepage = await import("./components/layouts/EventHomepage");
			return { Component: EventHomepage.default };
		},
		errorElement: <ErrorPage />,
	},
	// Ruta para el checkout
	{
		path: "/checkout/:eventId",
		async lazy() {
			const Checkout = await import("./components/layouts/Checkout");
			return { Component: Checkout.default };
		},
		errorElement: <ErrorPage />,
		children: [
			{
				path: ":orderShortId/details",
				async lazy() {
					const CollectInformation = await import("./components/routes/ticket-widget/CollectInformation");
					return { Component: CollectInformation.default };
				},
			},
			{
				path: ":orderShortId/payment",
				async lazy() {
					const Payment = await import("./components/routes/ticket-widget/Payment");
					return { Component: Payment.default };
				},
			},
			{
				path: ":orderShortId/summary",
				async lazy() {
					const OrderSummaryAndTickets = await import("./components/routes/ticket-widget/OrderSummaryAndTickets");
					return { Component: OrderSummaryAndTickets.default };
				},
			},
		],
	},
	// Ruta para tickets
	{
		path: "/ticket/:eventId/:attendeeShortId",
		async lazy() {
			const AttendeeTicketAndInformation = await import("./components/routes/ticket-widget/AttendeeTicketAndInformation");
			return { Component: AttendeeTicketAndInformation.default };
		},
		errorElement: <ErrorPage />,
	},
	// Ruta para check-in
	{
		path: "/check-in/:checkInListShortId",
		async lazy() {
			const CheckIn = await import("./components/layouts/CheckIn");
			return { Component: CheckIn.default };
		},
		errorElement: <ErrorPage />,
	},
];