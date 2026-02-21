import { openDB } from './repository';

export function IndexedDBPage() {
  return (
    <div>
      <div>Theme</div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);
          const db = await openDB();
          db.put('settings', {
            key: 'theme',
            value: String(data.get('theme')),
          });
          form.reset();
        }}
        className="space-y-2"
      >
        <div>
          <input name="theme" className="border" />
        </div>
        <div>
          <button className="border p-1">Save</button>
        </div>
      </form>
      <div className="h-10"></div>

      <div>Todo list</div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);
          const name = String(data.get('name'));
          if (!name) {
            return;
          }
          const isChecked = data.get('isChecked') !== null;
          const id = crypto.randomUUID();

          const db = await openDB();
          db.put('todo', { id, name, isChecked });
          form.reset();
        }}
        className="space-y-2"
      >
        <div>
          <div>
            <input name="name" className="border" />
          </div>
          <div>
            <label>
              <input name="isChecked" type="checkbox" /> Checked
            </label>
          </div>
        </div>
        <div>
          <button className="border p-1">Save</button>
        </div>
      </form>
    </div>
  );
}
