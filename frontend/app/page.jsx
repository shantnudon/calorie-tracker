import NavM from "@/components/NavM";
import AddNew from "@/components/addButton";
import Circle from "@/components/circle";

export default function Home() {

  return (
    <>
      <NavM />
      <div className="grid grid-cols-2">
        <div className="border-2 border-bg-white">
          <Circle value={99} />
        </div>
        <div className="border-2 border-bg-white">total all consumed</div>
        <div className="border-2 border-bg-white">
          <AddNew />
        </div>
        <div className="border-2 border-bg-white">helo</div>
      </div>
    </>
  );
}
