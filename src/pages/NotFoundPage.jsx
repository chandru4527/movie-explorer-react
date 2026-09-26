import { useNavigate } from "react-router-dom";
import { MdMovie, MdHome, MdArrowBack, MdSearchOff } from "react-icons/md";

import Button from "../components/Button";
import Image from "../components/media/Image";

import mainLogo from "../assets/mainlogo.png";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0b0d] px-5 *:text-white">
            {/* Background Glow */}
            <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 animate-pulse rounded-full bg-red-600/20 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 animate-pulse rounded-full bg-red-900/20 blur-[120px]" />

            <div className="relative mx-auto w-full max-w-5xl">
                {/* Logo */}
                <div className="mb-10 flex justify-center md:mb-12 md:justify-start">
                    <Image
                        src={mainLogo}
                        alt="MovieExplorer"
                        className="h-8 w-auto sm:h-10"
                    />
                </div>

                {/* Main Content */}
                <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
                    {/* Left Section */}
                    <div className="relative flex flex-col items-center justify-center md:items-start">
                        {/* Top Badge */}
                        <div className="mb-5 flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-3 py-2">
                            <MdMovie className="text-lg text-red-500" />
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-100">
                                Lost in the Reel
                            </span>
                        </div>

                        {/* Search Icon */}
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-[#151517] shadow-[0_0_40px_rgba(220,38,38,0.15)]">
                            <MdSearchOff className="text-4xl text-red-500" />
                        </div>

                        {/* Large 404 */}
                        <h1 className="select-none text-[140px] font-black leading-none tracking-tighter text-white/90 sm:text-[190px]">
                            404
                        </h1>

                        {/* Bottom Label */}
                        <div className="mt-4 flex items-center gap-2">
                            <span className="h-1 w-10 rounded-full bg-red-600" />
                            <span className="text-xs uppercase tracking-[0.25em] text-gray-100">
                                Page Not Found
                            </span>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="text-center md:text-left">
                        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-red-500">
                            Cut! This page is missing.
                        </p>

                        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                            This scene isn't
                            <span className="text-red-500"> in the movie.</span>
                        </h2>

                        <p className="mt-5 text-sm leading-7 text-gray-200 sm:text-base">
                            Looks like you've wandered off the script. The page
                            you're looking for doesn't exist, may have been moved,
                            or is no longer available.
                        </p>

                        {/* Reusable Buttons */}
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                            <Button
                                variant="danger"
                                size="lg"
                                shape="rounded"
                                onClick={() => navigate("/")}
                                leftIcon={MdHome}
                                className="bg-red-600 px-6 py-3 text-sm font-semibold hover:bg-red-700"
                            >
                                Back to Home
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                shape="rounded"
                                onClick={() => navigate(-1)}
                                leftIcon={MdArrowBack}
                                leftIconClassName="text-gray-300"
                                className="border-white/10 bg-white/3 px-6 py-3 text-sm font-semibold text-gray-100 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                            >
                                Go Back
                            </Button>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-10 border-t border-white/10 pt-5">
                            <div className="flex items-center justify-center gap-2 text-sm font-semibold md:justify-start">
                                <MdMovie className="text-xl text-red-500" />
                                <span>MovieExplorer</span>
                            </div>

                            <p className="mt-2 text-xs text-gray-600">
                                Your next favorite movie is just a click away.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NotFound;