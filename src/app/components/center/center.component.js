import { Outlet } from 'react-router-dom';

const CenterComponent = () => {
    return (
        <main className="flex-grow-1 flex-shrink-1 bg-body text-body">
            <article className="container py-2 h-100">
                <Outlet />
            </article>
        </main>
    );
};

export default CenterComponent;
