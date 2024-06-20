import img from "../assets/OIG1.jpeg";
import { Link } from "react-router-dom";
export default function Component() {
    return (
        <div className="flex flex-col h-screen overflow-y-scroll no-scrollbar">
            <header className="px-4 lg:px-6 h-14 flex items-center bg-slate-200 p-4 sticky top-0 opacity-80">
                <Link to={"/"} className="flex items-center justify-center">
                    <MountainIcon className="h-6 w-6" />
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link
                        to={"/signin"}
                        className="text-sm font-medium hover:underline underline-offset-4"
                    >
                        Sign In
                    </Link>
                    <Link
                        to={"/signup"}
                        className="text-sm font-medium hover:underline underline-offset-4"
                    >
                        Sign Up
                    </Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-6 md:py-12 lg:py-16">
                    <div className="px-4 md:px-16 lg:px-24">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Welcome to Connectly
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Your hub for insightful blogs and
                                        engaging stories.
                                    </p>
                                </div>
                                {localStorage.getItem("token") ? (
                                    <div>
                                        <Link
                                            to={"/blogs"}
                                            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-200"
                                        >
                                            Blogs
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                        <Link
                                            to={"/signin"}
                                            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-200"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to={"/signup"}
                                            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-200"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                                <div>
                                    <a
                                        type="button"
                                        href="https://github.com/soumyaranjan-panda/Connectly" target="_blank"
                                        className="text-white bg-gray-800 hover:bg-gray-900   font-medium rounded-full text-sm px-5 py-2.5 me-2  "
                                    >
                                        GitHub
                                    </a>
                                </div>
                            </div>
                            <img
                                src={img}
                                alt="Hero"
                                className="w-1/2 sm:w-full lg:w-3/4 xl:w-8/12 mx-auto aspect-video overflow-hidden rounded-xl object-cover lg:order-last lg:aspect-square"
                            />
                        </div>
                    </div>
                </section>
                <section className="w-full py-4 md:py-8 lg:py-10 bg-muted">
                    <div className="px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Innovative Solutions for the Future
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Connectly is at the forefront of
                                    technological innovation, providing
                                    cutting-edge solutions to help you stay
                                    ahead of the curve.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">
                    &copy; 2024 Connectly Inc. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <a
                        href="#"
                        className="text-xs hover:underline underline-offset-4"
                    >
                        Terms of Service
                    </a>
                    <a
                        href="#"
                        className="text-xs hover:underline underline-offset-4"
                    >
                        Privacy
                    </a>
                </nav>
            </footer>
        </div>
    );
}

function MountainIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    );
}
