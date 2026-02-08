import {
  Button,
  ButtonGroup,
  clsx,
  IconButton,
  SvgIcon,
} from '@hanlogy/react-ui';

const buttonGroupItems = [
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
] as const;

const buttonSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'] as const;

export function ButtonsPage() {
  const icon = (
    <SvgIcon viewBox="0 0 10 10" className="text-green-700">
      <path d="M0 0H10V10H0Z" />
    </SvgIcon>
  );

  return (
    <div className="space-y-10">
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
      <div>
        <div>Button</div>
        <div className="space-x-2">
          {buttonSizes.map((size) => {
            return (
              <Button className="bg-gray-300" size={size} key={size}>
                {size}
              </Button>
            );
          })}
        </div>
      </div>
      <div>
        <div>Button with icon</div>
        <div className="space-x-2">
          {buttonSizes.map((size) => {
            return (
              <Button
                icon={icon}
                className="bg-gray-300"
                size={size}
                key={size}
              >
                {size}
              </Button>
            );
          })}
        </div>
      </div>
      <div>
        <div>Icon Button component regular</div>
        <div className="space-x-2">
          {buttonSizes.map((size) => {
            return (
              <IconButton className="bg-gray-300" size={size} key={size}>
                {icon}
              </IconButton>
            );
          })}
        </div>
      </div>

      <div>
        <div>Icon Button component narrow</div>
        <div className="space-x-2">
          {buttonSizes.map((size) => {
            return (
              <IconButton
                className="bg-gray-300"
                size={size}
                key={size}
                width="narrow"
              >
                {icon}
              </IconButton>
            );
          })}
        </div>
      </div>

      <div>
        <div>Icon Button component wide</div>
        <div className="space-x-2">
          {buttonSizes.map((size) => {
            return (
              <IconButton
                className="bg-gray-300"
                size={size}
                key={size}
                width="wide"
              >
                {icon}
              </IconButton>
            );
          })}
        </div>
      </div>
    </div>
  );
}
