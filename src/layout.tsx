import { Link, Outlet } from 'react-router';

const pages = [
  { path: '/', label: 'Home' },
  { path: '/icons', label: 'Icons' },
  { path: '/buttons', label: 'Buttons' },
  { path: '/inputs', label: 'Inputs' },
  { path: '/form', label: 'Form' },
  { path: '/form-deprecated', label: 'Form deprecated' },
  { path: '/collapsible-tree', label: 'Collapsible Tree' },
  { path: '/dropdowns', label: 'Dropdowns' },
  { path: '/dialogs', label: 'Dialogs' },
] as const;

export function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <div className="h-14"></div>
      <header className="bg-gray-800 h-14 flex items-center px-4 fixed left-0 top-0 right-0 z-100">
        <h1 className="text-white text-xl font-medium">React UI</h1>
        <div className="text-gray-300 ml-3 text-sm">Examples</div>
      </header>
      <div className="flex flex-1">
        <aside className="w-60 border-r border-r-gray-300 py-4">
          <ul>
            {pages.map(({ path, label }) => {
              return (
                <li key={path}>
                  <Link
                    className="h-10 flex items-center hover:bg-gray-100 px-4"
                    to={path}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
