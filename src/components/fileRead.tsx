import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function FileRd() {
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
          <Input
            type="file"
            id="csvFileInput"
            accept=".csv"
            onChange={searchForCSV}
          />
        </form>
        <Textarea id="output" />
      </div>
    </>
  );
}
