"use client";
import { Header, Footer } from "../components/shell";
export default function ErrorPage({ reset }: { reset: () => void }) { return <><Header/><main id="main-content" className="container commerce-page"><div className="empty" role="alert"><h1>We couldn’t load this page.</h1><p>The food catalog is temporarily unavailable.</p><button className="button" onClick={reset}>Try again</button> <a href="/">Back to the pantry</a></div></main><Footer/></>; }
