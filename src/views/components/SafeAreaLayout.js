import React from 'react';
import {FlexStyle, View, ViewProps} from 'react-native';
import {EdgeInsets, SafeAreaConsumer} from 'react-native-safe-area-context';
import {StyledComponentProps} from '@ui-kitten/components';

interface InsetProvider {
  toStyle: (insets: EdgeInsets, styles) => FlexStyle;
}

const INSETS: Record<string, InsetProvider> = {
  top: {
    toStyle: (insets, styles) => ({
      ...styles,
      paddingTop: insets.top,
    }),
  },
  bottom: {
    toStyle: (insets: EdgeInsets, styles): FlexStyle => ({
      ...styles,
      paddingBottom: insets.bottom,
    }),
  },
};

type Inset = 'top' | 'bottom';

export interface SafeAreaLayoutProps extends ViewProps, StyledComponentProps {
  insets?: Inset;
  children?: React.ReactNode;
}

export class SafeAreaLayoutComponent extends React.Component<SafeAreaLayoutProps> {
  static styledComponentName: string = 'SafeAreaLayout';

  render() {
    return <SafeAreaConsumer>{this.renderComponent}</SafeAreaConsumer>;
  }

  createInsets = (insets, safeAreaInsets: EdgeInsets, style): FlexStyle[] => {
    return React.Children.map(insets, (inset) =>
      INSETS[inset].toStyle(safeAreaInsets, style),
    );
  };

  renderComponent = (safeAreaInsets) => {
    const {style, insets, themedStyle, ...viewProps} = this.props;

    return (
      <View
        {...viewProps}
        style={[this.createInsets(insets, safeAreaInsets, themedStyle), style]}
      />
    );
  };
}

export const SafeAreaLayout = SafeAreaLayoutComponent;
