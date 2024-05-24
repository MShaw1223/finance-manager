import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const FileRead = () => {
  async function searchForCSV(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const contents = e.target?.result as string;
      displayCSV(contents);
    };
    reader.readAsText(file);
  }
  function displayCSV(csv: string) {
    const outputDiv = document.getElementById("output");
    if (outputDiv) {
      outputDiv.innerText = csv;
    }
  }
  return (
    <>
      <div className="flex flex-col space-y-3">
        <form>
          <label className="block">
            <Input
              type="file"
              id="csvFileInput"
              accept=".csv"
              onChange={searchForCSV}
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:font-semibold hover:file:bg-accent/35 file:bg-accent border-0 h-11"
            />
          </label>
        </form>
        <div className="p-1">
          <Textarea id="output" placeholder="Click on choose file" />
        </div>
      </div>
    </>
  );
};
export default FileRead;
