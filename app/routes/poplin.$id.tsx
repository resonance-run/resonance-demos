import { useLocation } from 'react-router';

export const loader = () => {
  throw new Response(null, { status: 404 });
};

export function ErrorBoundary() {
  const location = useLocation();
  return (
    <section className="mt-16">
      <p>
        Welcome to the <span className="font-mono font-semibold text-lg">{location.pathname}</span> page
      </p>
    </section>
  );
}
