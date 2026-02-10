import {
  clsx,
  Dropdown,
  DropdownMenu,
  type DropdownButtonBuilder,
} from '@hanlogy/react-web-ui';

export function DropdownsPage() {
  const buttonBuilder: DropdownButtonBuilder = ({ show, isShown }) => (
    <button
      className={clsx(
        'px-4 py-2 border border-gray-300 cursor-pointer rounded-md',
        {
          'bg-gray-200': isShown,
        },
      )}
      onClick={() => show()}
    >
      Click me
    </button>
  );
  const menuItems = [
    {
      name: 'one',
      label: 'Menu item 1',
    },
    {
      name: 'two',
      label: 'Menu item two',
    },
  ] as const;

  return (
    <div>
      <h2>Dropdown</h2>
      <div className="mb-10">
        <Dropdown buttonBuilder={buttonBuilder}>
          <div className="p-4 bg-amber-100 border border-gray-200 shadow-lg rounded-xl">
            Dropdown content. <br />
            Also support `children(close)`
          </div>
        </Dropdown>
      </div>
      <h2>Dropdown Menu</h2>
      <DropdownMenu
        className="bg-white rounded-lg shadow-lg border border-gray-200 p-1"
        options={menuItems}
        buttonBuilder={buttonBuilder}
        itemBuilder={({ item, close }) => {
          return (
            <button
              className="cursor-pointer hover:bg-gray-200 px-5 py-2 w-full text-left rounded-sm"
              onClick={() => close()}
            >
              {item.label}
            </button>
          );
        }}
        keyBuilder={({ name }) => name}
      />
    </div>
  );
}
