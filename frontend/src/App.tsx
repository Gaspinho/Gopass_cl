import React, {FC, PropsWithChildren, useEffect, useRef, useState} from "react";
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {i18n} from "@lingui/core";
import {I18nProvider} from "@lingui/react";
import {ModalsProvider} from "@mantine/modals";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Helmet, HelmetProvider} from "react-helmet-async";

import "@mantine/core/styles/global.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/charts/styles.css";
import "./styles/global.scss";
import {isSsr} from "./utilites/helpers.ts";
import {dynamicActivateLocale, getSupportedLocale} from "./locales";
import {StartupChecks} from "./StartupChecks.tsx";

declare global {
    interface Window {
        hievents: Record<string, string>;
    }
}

export const App: FC<
    PropsWithChildren<{
        queryClient: QueryClient;
        locale: string;
        helmetContext?: any;
    }>
> = (props) => {
    const [isLoadedOnBrowser, setIsLoadedOnBrowser] = React.useState(false);
    const localeActivated = useRef(false);
    const [loaded, setLoaded] = useState(isSsr());

    useEffect(() => {
        if (!localeActivated.current && typeof window !== "undefined") {
            localeActivated.current = true;
            dynamicActivateLocale(getSupportedLocale(props.locale)).then(() => setLoaded(true));
        }
        setIsLoadedOnBrowser(!isSsr());
    }, []);

    if (!loaded) {
        return <></>;
    }

    return (
        <React.StrictMode>
            <div
                className="ssr-loader"
                style={{
                    width: "100vw",
                    height: "100vh",
                    position: "fixed",
                    background: "#ffffff",
                    zIndex: 1000,
                    display: isLoadedOnBrowser ? "none" : "block",
                }}
            />
            <MantineProvider
                theme={{
                    colors: {
                        purple: [
                            "#FFB3A6", // Más claro
                            "#FF9984",
                            "#FF7E6B",
                            "#FF6F61", // Color principal
                            "#E66458",
                            "#CC5A4F",
                            "#B35146",
                            "#993D3C",
                            "#803132",
                            "#662729", // Más oscuro
                          ],
                    },
                    primaryColor: "purple",
                    fontFamily: "'Varela Round', sans-serif",
                }}
            >
                <HelmetProvider context={props.helmetContext}>
                    <I18nProvider i18n={i18n}>
                        <QueryClientProvider client={props.queryClient}>
                            <StartupChecks/>
                            <ModalsProvider>
                                <Helmet>
                                    <title>GoPass cl</title>
                                </Helmet>
                                {props.children}
                            </ModalsProvider>
                            <Notifications/>
                        </QueryClientProvider>
                    </I18nProvider>
                </HelmetProvider>
            </MantineProvider>
        </React.StrictMode>
    );
};
