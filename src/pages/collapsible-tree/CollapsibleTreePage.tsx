import { CollapsibleTree, IconWrapper } from '@hanlogy/react-web-ui';
import { ChevronDown, ChevronRight } from '../../components/icons';

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
                    <IconWrapper>
                      <ChevronRight />
                    </IconWrapper>
                  ) : (
                    <IconWrapper>
                      <ChevronDown />
                    </IconWrapper>
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
