import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}: LayoutProps) => {
    return (
        <div className={`w-full`}>
            <div className="flex min-h-screen pt-[4rem]">
                <main className={`flex-1 overflow-y-auto bg-white text-black`}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout;