"use client";

export default function PrintButton() {
  return (
    <button className="print-button button-primary" type="button" onClick={() => window.print()}>
      Print program
    </button>
  );
}
