import { ButtonGroup, clsx } from '@hanlogy/react-ui';

const buttonGroupItems = [
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
];

export function ButtonsPage() {
  return (
    <div className="space-x-10">
      <div>
        <div className="mb-2">Button group</div>
        <div className="max-w-100">
          <ButtonGroup
            items={buttonGroupItems}
            value="today"
            buttonBuilder={({ isSelected, isFirst, isLast, item }) => {
              return (
                <button
                  key={item.value}
                  className={clsx(
                    'h-10',
                    {
                      'rounded-l-full': isFirst,
                      'rounded-r-full': isLast,
                    },
                    isSelected ? 'bg-gray-400' : 'bg-gray-200',
                  )}
                >
                  {item.label}
                </button>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
