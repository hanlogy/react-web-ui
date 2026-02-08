import { CollapsibleTree, IconContainer, SvgIcon } from '@hanlogy/react-ui';

export interface Item {
  name: string;
  label: string;
  children?: Item[];
}

const tree: Item[] = [
  {
    name: 'one',
    label: 'One',
    children: [
      {
        name: 'one-1',
        label: 'One 1',
        children: [
          {
            name: 'one-1-1',
            label: 'One 1-1',
          },
        ],
      },
    ],
  },
  {
    name: 'two',
    label: 'Two',
    children: [],
  },
] as const;

export function CollapsibleTreePage() {
  return (
    <>
      <div className="max-w-100">
        <CollapsibleTree
          itemBuilder={(item, isCollapsed, toggleIsCollapsed) => (
            <button
              className="flex items-center justify-between w-full text-left px-2 py-2 cursor-pointer hover:bg-gray-100"
              onClick={toggleIsCollapsed}
            >
              <span>{item.label}</span>
              {(item.children?.length ?? 0) > 0 && (
                <span>
                  {isCollapsed ? (
                    <IconContainer>
                      <SvgIcon viewBox="0 -960 960 960">
                        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                      </SvgIcon>
                    </IconContainer>
                  ) : (
                    <IconContainer>
                      <SvgIcon viewBox="0 -960 960 960">
                        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                      </SvgIcon>
                    </IconContainer>
                  )}
                </span>
              )}
            </button>
          )}
          keyBuilder={(e) => e.name}
          items={tree}
        />
      </div>
    </>
  );
}
