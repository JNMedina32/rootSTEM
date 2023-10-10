import {
  Tooltip,
  Overlay,
  OverlayTrigger,
  Popover,
  Ratio,
  Button,
  Form,
  Modal,
  InputGroup
} from "react-bootstrap";

export const FormComp = {
  Form,
  Button,
  Modal,
  InputGroup,
};

export const TooltipComp = {
  Tooltip,
  OverlayTrigger,
  Popover,
  Overlay,
  Ratio,
};

export function learnerDefinitions(learnerSetting) {
  switch (learnerSetting) {
    case "Seedling":
      return (
        <p>
          A Seedling is a learner who is just starting out on their journey to
          learn about STEM. Barely any rootS. They are curious and eager to
          learn about the world around them.
          <strong>
            They will not be asked any questions about the videos they watch
          </strong>
          .
        </p>
      );

    case "Sprout":
      return (
        <p>
          A Sprout is a learner who is starting to grow their knowledge of STEM.
          Some rootS established.
          <strong>
            They will be asked 1 random question for every 3 videos they watch.
          </strong>
        </p>
      );

    case "Sapling":
      return (
        <p>
          This level represents a more engaged learner, similar to a young tree,
          with stronger rootS.
          <strong>
            They will be asked 2 random questions for every 5 videos they have
            seen
          </strong>
          , demonstrating a deeper level of commitment to learning and growth.
        </p>
      );

    case "Branching":
      return (
        <p>
          A Branching learner is one who is branching out into the world of
          STEM. They have a strong foundation of rootS and are ready to learn
          more.
          <strong>
            They will be asked 5 random questions for every 10 videos they have
            seen
          </strong>
          , demonstrating a deeper level of commitment to learning and growth.
        </p>
      );

    case "Full Bloom":
      return (
        <p>
          A Full Bloom learner is one who has a strong foundation of rootS and
          comprehensive understanding of the many branches in STEM.
          <strong>
            They will be asked 7 random questions for every 10 videos they have
            seen.
          </strong>
        </p>
      );

    default:
      return "Choose a learner type to see the definition.";
  }
}

// export const TooltipComp = Tooltip;
// export const OverlayTriggerComp = OverlayTrigger;
// export const PopoverComp = Popover;
// export const OverlayComp = Overlay;
