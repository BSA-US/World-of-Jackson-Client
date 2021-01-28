import React from "react";
import H1 from './H1';

export default {
  title: 'H1'
}

const onClick = () => window.alert('Hi!')

export const Inline = () => <H1 inline onClick={onClick}>World of Jackson</H1>
export const Floating = () => <H1 onClick={onClick}>World of Jackson</H1>
export const Collapsed = () => <H1 collapsed onClick={onClick}>World of Jackson</H1>
