export default function PrikaziGreske(props: prikaziGrekseProps) {
  const style = { color: "red" };

  return (
    <>
      {props.greske ? (
        <ul>
          {props.greske.map((greska, index) => {
            return (
              <li style={style} key={index}>
                {greska}
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}

interface prikaziGrekseProps {
  greske?: string[];
}
