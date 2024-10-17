// src/api/model.tsx
"use client"; // Ensure this is a client component

import React, { useState } from "react";

const MoleculeGenerator = () => {
  const [smiles, setSmiles] = useState("CCN(CC)C(=O)[C@@]1(C)Nc2c(ccc3ccccc23)C[C@H]1N(C)C");
  const [molecules, setMolecules] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      algorithm: "CMA-ES",
      num_molecules: 10,
      property_name: "QED",
      minimize: false,
      min_similarity: 0.3,
      particles: 30,
      iterations: 10,
      smi: smiles,
    };

    try {
      const response = await fetch('/api/molecule', { // Make sure the URL is correct
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const generatedMolecules = JSON.parse(data.molecules).map((mol: any) => ({
        structure: mol.sample,
        score: mol.score,
      }));

      setMolecules(generatedMolecules);
    } catch (error) {
      console.error("Error generating molecules:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Molecules from SMILES</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">SMILES String</label>
          <input
            type="text"
            value={smiles}
            onChange={(e) => setSmiles(e.target.value)}
            placeholder="Enter SMILES string"
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Molecule"}
        </button>
      </form>

      {molecules.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Generated Molecules:</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {molecules.map((mol: any, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <p><strong>Structure:</strong> {mol.structure}</p>
                <p><strong>Score:</strong> {mol.score}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoleculeGenerator;
