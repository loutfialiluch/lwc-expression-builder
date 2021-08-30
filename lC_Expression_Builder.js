import { LightningElement, api } from "lwc";

const logicOptions = [
  {
    label: "All Conditions Are Met",
    value: "AND"
  },
  {
    label: "Any Condition Is Met",
    value: "OR"
  },
  {
    label: "Custom Logic Is Met",
    value: "Custom"
  }
];

const operatorOptions = [
  {
    label: "Equals",
    value: "="
  },
  {
    label: "Does Not Equal",
    value: "!="
  },
  {
    label: "Greater Than",
    value: ">"
  },
  {
    label: "Greater Than Or Equal",
    value: ">="
  },
  {
    label: "Less Than",
    value: "<"
  },
  {
    label: "Less Than Or Equal",
    value: "<="
  }
];

// Just for testing purposes
const fields = [
  {
    label: "First Name",
    value: "First Name"
  },
  {
    label: "Last Name",
    value: "Last Name"
  },
  {
    label: "Age",
    value: "Age"
  }
];

export default class LC_Expression_Builder extends LightningElement {
  logicOptions = logicOptions;
  logicValue = "AND"; // "AND" as default value

  operatorOptions = operatorOptions;

  @api
  fields = fields; // Just for testing purposes

  conditions = [
    {
      key: this.generateRandomKey(), // for for:each directive
      field: null,
      operator: null,
      value: null
    }
  ];

  customLogic;

  get isCustomLogic() {
    return this.logicValue === "Custom";
  }

  handleLogicChange(event) {
    this.logicValue = event.target.value;
  }

  handleAddCondition() {
    this.conditions = [
      ...this.conditions,
      {
        key: this.generateRandomKey(), // for for:each directive
        field: null,
        operator: null,
        value: null
      }
    ];
  }

  handleChange(event) {
    const conditionIndex = event.currentTarget.dataset.index;
    this.conditions[conditionIndex][event.target.name] = event.target.value;
  }

  handleDelete(event) {
    if (this.conditions.length === 1) {
      return;
    }
    this.conditions = this.conditions.filter(
      (condition, index) => index !== +event.target.dataset.index
    );
  }

  handleCustomLogicChange(event) {
    this.customLogic = event.target.value;
  }

  generateRandomKey() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}
