import React from "react";

export default function Paginacija(props: paginacijaProps) {
  const [linkModels, setLinkModels] = React.useState<linkModel[]>([]);
  function izaberiStranu(link: linkModel) {
    if (link.strana === props.trenutnaStrana) {
      return;
    }

    if (!link.enabled) {
      return;
    }

    props.onChange(link.strana);
  }
  function getClass(link: linkModel) {
    if (link.aktivno) {
      return "active pointer";
    }
    if (!link.enabled) {
      return "disabled";
    }

    return "pointer";
  }

  React.useEffect(() => {
    const prethodnaStranaEnabled = props.trenutnaStrana !== 1;
    const prethodnaStrana = props.trenutnaStrana - 1;
    const links: linkModel[] = [];

    links.push({
      tekst: "Prethodna",
      enabled: prethodnaStranaEnabled,
      strana: prethodnaStrana,
      aktivno: false,
    });

    for (let i = 1; i <= props.ukupnoStrana; i++) {
      if (
        i >= props.trenutnaStrana - props.radio &&
        i <= props.trenutnaStrana + props.radio
      ) {
        links.push({
          tekst: `${i}`,
          aktivno: props.trenutnaStrana === i,
          enabled: true,
          strana: i,
        });
      }
    }

    const sledecaStranaEnabled =
      props.trenutnaStrana !== props.ukupnoStrana && props.ukupnoStrana > 0;
    const sledecaStrana = props.trenutnaStrana + 1;

    links.push({
      tekst: "Sledeća",
      strana: sledecaStrana,
      enabled: sledecaStranaEnabled,
      aktivno: false,
    });

    setLinkModels(links);
  }, [props.trenutnaStrana, props.ukupnoStrana, props.radio]);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {linkModels.map((link) => {
          return (
            <li
              key={link.tekst}
              onClick={() => izaberiStranu(link)}
              className={`page-item cursor ${getClass(link)}`}
            >
              <span className="page-link">{link.tekst}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

interface linkModel {
  strana: number;
  enabled: boolean;
  tekst: string;
  aktivno: boolean;
}

interface paginacijaProps {
  trenutnaStrana: number;
  ukupnoStrana: number;
  radio: number;
  onChange(strana: number): void;
}

Paginacija.defaultProps = {
  radio: 3,
};
