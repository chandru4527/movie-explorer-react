import { isRouteErrorResponse, useRouteError, useNavigate } from "react-router-dom";
import { MdHome, MdRefresh, MdWarningAmber } from "react-icons/md";
import mainLogo from "../assets/mainlogo.png";

import Button from "../components/Button";
import Image from "../components/media/Image";

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    const status = isRouteErrorResponse(error) ? error.status : 500;

    const message = isRouteErrorResponse(error)
        ? error.data?.message || error.statusText || "Unable to load this page."
        : error instanceof Error
            ? error.message
            : "An unexpected error occurred.";

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080809] px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">
            {/* Background glow */}
            <div className="pointer-events-none absolute -left-40 top-0 h-72 w-72 rounded-full bg-red-600/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[130px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-red-600/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[130px]" />

            <div className="relative mx-auto w-full max-w-5xl">

                {/* Logo */}
                <header className="mb-8 flex items-center sm:mb-10 lg:mb-12">
                    <Image src={mainLogo} alt="MovieExplorer" className="h-10 w-auto sm:h-12" />
                </header>

                {/* Main content */}
                <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-10 lg:gap-16">

                    {/* Left side */}
                    <div className="relative flex flex-col items-center justify-center text-center">
                        {/* Background glow */}
                        <div className="pointer-events-none absolute h-48 w-48 rounded-full bg-red-600/10 blur-[70px] sm:h-64 sm:w-64" />

                        {/* Error icon */}
                        <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-linear-to-br from-red-500/15 to-transparent sm:mb-6 sm:h-20 sm:w-20">
                            <MdWarningAmber className="text-4xl text-red-500 sm:text-5xl" />
                        </div>

                        {/* Status number */}
                        <div className="relative">
                            <h2 className="text-8xl font-black leading-none tracking-tighter text-white sm:text-9xl">
                                {status}
                            </h2>
                            <span className="absolute -right-3 top-0 h-3 w-3 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] sm:-right-5 sm:h-4 sm:w-4" />
                        </div>

                        {/* Error badge */}
                        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.07] px-4 py-2">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-400 sm:text-xs">
                                Error {status}
                            </span>
                        </div>

                        {/* Decorative line */}
                        <div className="mt-6 h-px w-20 bg-linear-to-r from-transparent via-red-500/60 to-transparent sm:mt-8 sm:w-28" />

                        <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-gray-100">
                            Scene interrupted
                        </p>
                    </div>

                    {/* Right side */}
                    <div className="min-w-0">
                        <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-500 sm:mb-4 sm:text-xs sm:tracking-[0.25em]">
                            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-red-500" />
                            System Error
                        </p>

                        <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                            Something went
                            <span className="block text-red-500">off script.</span>
                        </h1>

                        <p className="mt-4 text-sm leading-6 text-gray-200 sm:mt-5 sm:leading-7">
                            Looks like there was a problem loading this scene.
                            Don't worry, the show isn't over. Return home or
                            try loading the page again.
                        </p>

                        {/* Error details */}
                        <div className="mt-5 min-w-0 rounded-xl border border-white/10 bg-white/3 p-3 sm:mt-6 sm:p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-100">
                                Error details
                            </p>
                            <p className="mt-2 wrap-break-word text-sm leading-6 text-gray-300 font-semibold">
                                {message}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                            <Button
                                variant="danger"
                                size="lg"
                                shape="rounded"
                                leftIcon={MdHome}
                                fullWidth
                                className="sm:w-auto"
                                onClick={() => navigate("/")}>
                                Back to Home
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                shape="rounded"
                                leftIcon={MdRefresh}
                                fullWidth
                                className="border-white/10 text-gray-300 hover:border-red-500/50 hover:bg-red-500/10 hover:text-white sm:w-auto"
                                onClick={() => window.location.reload()}>
                                Try Again
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-10 border-t border-white/10 pt-4 text-center sm:mt-12 sm:pt-5">
                    <p className="text-xs leading-5 text-gray-200">
                        © {new Date().getFullYear()} Streamit. Back to the movies.
                    </p>
                </footer>
            </div>
        </main>
    );
};

export default ErrorPage;