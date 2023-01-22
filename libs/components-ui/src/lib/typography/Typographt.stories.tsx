import { ComponentStory, ComponentMeta } from '@storybook/react';
import Typography from './Typography';

export default {
  component: Typography,
  title: 'Typography',
  parameters: {
    componentSubtitle:
      'Typography is the art of arranging letters and text in a way that makes the copy legible, clear, and visually appealing to the reader. It involves font style, appearance, and structure, which aims to elicit certain emotions and convey specific messages',
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => {
  return <Typography {...args}>{args.children}</Typography>;
};

export const Component = Template.bind({});
Component.args = {
  variant: 'h1',
  children: 'Typography',
  borderTop: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
  borderRight: { xs: 1, xl: 5 },
  borderLeft: 5,
  borderRadius: {xs: "50%", sm: 10, md: "90%", lg: "20%"},
  borderBottom: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
};

export const Variants = () => (
  <div>
    <Typography gutterBottom variant="h1">
      h1. Heading
    </Typography>
    <Typography gutterBottom variant="h2">
      h2. Heading
    </Typography>
    <Typography gutterBottom variant="h3">
      h3. Heading
    </Typography>
    <Typography gutterBottom variant="h4">
      h4. Heading
    </Typography>
    <Typography gutterBottom variant="h5">
      h5. Heading
    </Typography>
    <Typography gutterBottom variant="h6">
      h6. Heading
    </Typography>
    <Typography gutterBottom variant="subtitle1">
      subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur
    </Typography>
    <Typography gutterBottom variant="subtitle2">
      subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur
    </Typography>
    <Typography gutterBottom variant="body1">
      body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
      neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
      Eum quasi quidem quibusdam.
    </Typography>
    <Typography gutterBottom variant="body2">
      body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
      neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
      Eum quasi quidem quibusdam.
    </Typography>
    <Typography gutterBottom variant="button">
      BUTTON TEXT
    </Typography>
    <br />
    <Typography gutterBottom variant="caption">
      caption text
    </Typography>
    <br />
    <Typography gutterBottom variant="overline">
      OVERLINE TEXT
    </Typography>
  </div>
);

Variants.parameters = {
  docs: {
    storyDescription: 'Many variants are supported',
  },
};

const TemplateNoWrap: ComponentStory<typeof Typography> = (args) => {
  return <Typography {...args}>{args.children}</Typography>;
};

export const NoWrap = TemplateNoWrap.bind({});

NoWrap.args = {
  variant: 'body1',
  children:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia nulla laborum expedita. Quibusdam corporis, cumque et reprehenderit adipisci dignissimos modi doloribus doloremque sequi illum tempore ipsum eius quia enim? Quisquam rem adipisci reprehenderit ratione facere aliquam est aliquid dolore illum ea velit quasi illo omnis qui reiciendis, repudiandae dolorem. Eos?',
  noWrap: true,
};

NoWrap.parameters = {
  controls: {
    include: ['noWrap', 'variant'],
  },
  docs: {
    storyDescription:
      '`noWrap` Text cannot wrap itself in a newline. `subtitles` will always have `noWrap` set to true',
  },
};
