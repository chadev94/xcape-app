import React from 'react';

import {ScrollView, StyleSheet} from 'react-native';
import {ViewType} from '../ViewType';

const TagPreview = props => {
  const {viewList} = props.route.params;

  return (
    <ScrollView style={{backgroundColor: 'black'}}>
      {viewList.map(view => {
        const {type, answer, targetTagId, height, url, message1, message2} =
          view;
        const Component = ViewType[type];

        return (
          <Component
            key={view.id}
            answer={answer}
            targetTagId={targetTagId}
            height={height}
            url={url}
            message1={message1}
            message2={message2}
            isPreview={true}
          />
        );
      })}
    </ScrollView>
  );
};

export default TagPreview;

const styles = StyleSheet.create({});
