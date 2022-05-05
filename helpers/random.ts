/**Randomizer */
export const RNG = {
  Boolean: () => Math.random() > 0.5,
  Float: (limit = 1) => {
    let float = parseFloat((Math.random() * limit).toFixed(2));
    return float;
  },
  Int: (limit: number) => Math.ceil(Math.random() * limit),
  Name: (prefix: string, postFix: string, limit = 100) =>
    `${prefix} ${RNG.Int(limit)} ${postFix}`,
  Lorem: () => RNG.Shuffle(lorems)[RNG.Int(lorems.length - 1)],
  Shuffle: (array: any[]) => {
    if (array == null) array = [];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  },
};

const lorems = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, itaque ratione ab aliquam odit consequatur? Sunt ut cum voluptas, provident, optio amet blanditiis molestiae officiis quis repellendus facilis, repellat eaque?",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora impedit soluta, vero facilis nemo sit aperiam exercitationem eum quas nobis rerum, unde temporibus deleniti accusamus modi. Tempore, odit ut. Nesciunt!",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, autem! Incidunt adipisci sit molestiae suscipit ipsum. Dolorem hic reiciendis quia repellat ducimus sapiente, voluptate tempore non. Delectus voluptatem quas quaerat.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quasi aut molestiae, placeat est nostrum itaque eveniet autem cupiditate earum quibusdam aspernatur atque dolor amet soluta. Suscipit consectetur velit temporibus!",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus facere deserunt autem sequi vitae dolores numquam voluptatibus unde, natus earum ullam commodi sunt, sapiente quasi illum quia laborum, reiciendis tempore?",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores vel iure molestiae cumque placeat quas repellendus hic, maiores harum consectetur incidunt facilis suscipit porro eligendi! Voluptate incidunt dolorem velit aperiam?",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias cumque laborum architecto veniam sint cupiditate nobis neque nesciunt dignissimos magnam. Veritatis, molestias. Error quisquam enim nisi. Distinctio reprehenderit quia impedit?",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus mollitia eligendi voluptatem natus obcaecati ipsam eum iure a dolorum, ipsum odio sit nobis harum cupiditate suscipit quo soluta nam accusantium.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum vero unde quas rerum non, a ducimus blanditiis voluptate dolor doloremque obcaecati, pariatur nesciunt esse dolores ipsa corporis labore at voluptates!",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, sunt repellendus? Eum et necessitatibus ipsam, hic placeat temporibus rem aliquid earum sapiente atque quidem libero architecto corrupti similique, impedit quisquam!",
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto ducimus deserunt velit, error itaque magnam, quam, officiis asperiores hic corrupti veniam enim voluptatibus nobis facere provident voluptas officia. Fugit, quasi!",
];
