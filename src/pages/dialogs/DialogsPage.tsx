import {
  DialogScaffold,
  DialogActionBar,
  DialogProvider,
  DialogTopbar,
  useDialog,
  type CloseDialogFn,
} from '@hanlogy/react-web-ui';

export function DialogsPage() {
  return (
    <DialogProvider>
      <DialogPageView />
    </DialogProvider>
  );
}

function DialogPageView() {
  const { openDialog } = useDialog();

  return (
    <div>
      <button
        className="focus:outline-none"
        onClick={() => {
          openDialog(
            ({ closeDialog }) => <InfoDialog closeDialog={closeDialog} />,
            {
              closeOnBackdropClick: false,
              closeOnEscape: false,
            },
          );
        }}
      >
        Show a dialog
      </button>
    </div>
  );
}

function InfoDialog({ closeDialog }: { closeDialog: CloseDialogFn }) {
  return (
    <DialogScaffold
      topbar={
        <DialogTopbar className="text-gray-600 font-medium text-2xl">
          Lorem Ipsum
        </DialogTopbar>
      }
      bottomBar={
        <DialogActionBar>
          <button onClick={() => closeDialog()}>Close</button>
        </DialogActionBar>
      }
      className="rounded-[1.75rem] bg-gray-200 shadow-white/40 shadow-lg max-w-md"
    >
      <div className="text-gray-600">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    </DialogScaffold>
  );
}
