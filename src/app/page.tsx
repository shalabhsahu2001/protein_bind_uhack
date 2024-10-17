import MoleculeGenerator from "./model";

export default function Home() {
  return (
    <>
      <div className="h-screen">
        <p>Protein Bind</p>
        <MoleculeGenerator />
      </div>
    </>
  );
}
