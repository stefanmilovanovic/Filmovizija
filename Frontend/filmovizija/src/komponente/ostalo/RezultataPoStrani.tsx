export default function RezultataPoStrani(props: rezultataPoStraniProps) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label style={{ paddingBottom: "20px", fontSize: "20px" }}>
        Rezultata po strani:
      </label>
      <div className="mb-3 ms-2" style={{ width: "150px" }}>
        <select
          className="form-select"
          defaultValue={5}
          onChange={(e) => {
            props.onChange(parseInt(e.currentTarget.value, 10));
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
}

interface rezultataPoStraniProps {
  onChange(rezultataPoStrani: number): void;
}
