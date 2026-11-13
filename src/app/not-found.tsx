import { Header, Footer } from "../components/shell";
export default function NotFound() { return <><Header/><main id="main-content" className="container commerce-page"><div className="empty"><h1>This food isn’t on the shelf.</h1><p>The product may have been removed or is not yet published.</p><a className="button" href="/">Back to the pantry</a></div></main><Footer/></>; }
