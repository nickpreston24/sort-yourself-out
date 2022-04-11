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
  Paragraph: () => lorems[RNG.Int(lorems.length + 1)],
  Shuffle: (array: []) => {
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
];
