import React from 'react';

import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {tagListState, themeListState, viewListState} from '../atoms';
import {useTagModal} from '../context/TagModalContext';
import {writeTag} from '../plugins/nfc';
import List from '../components/List';
import {Colors} from '../Colors';
import PretendardText from '../components/PretendardText';
import {useNavigation} from '@react-navigation/native';

const TagSelect = ({route}) => {
  const tagList = useRecoilValue(tagListState);
  const viewList = useRecoilValue(viewListState);
  const navigation = useNavigation();

  const themeList = useRecoilValue(themeListState);

  const tagListByThemeId = tagList
    .filter(tag => tag.themeId === route.params.themeId)
    .sort((a, b) => a.name.localeCompare(b.name));

  const {openTagModal, closeTagModal} = useTagModal();

  const writeTagId = tagId => {
    const selectedTheme = themeList.find(
      theme => theme.id === route.params.themeId,
    );
    const selectedTag = tagListByThemeId.find(tag => tag.id === tagId);

    openTagModal();
    writeTag(tagId).then(isSuccess => {
      if (isSuccess) {
        ToastAndroid.show(
          `"${selectedTheme.nameKo}"의 "${selectedTag.name}"을 입력했습니다.`,
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show('태그 쓰기를 실패했습니다.', ToastAndroid.SHORT);
      }
      closeTagModal();
    });
  };

  const tagPreview = tagId => {
    const viewListByTagId = viewList
      .filter(view => view.tagId === tagId)
      .sort((a, b) => a.orders - b.orders);
    navigation.push('TagPreview', {viewList: viewListByTagId});
  };

  return (
    <View style={styles.container}>
      {tagListByThemeId.length > 0 ? (
        <ScrollView>
          <View style={{paddingVertical: 20, backgroundColor: Colors.black}}>
            <List
              list={tagListByThemeId}
              displayName={'name'}
              onPress={value => {
                writeTagId(value);
              }}
              previewVisible={true}
              previewOnPress={value => tagPreview(value)}
            />
          </View>
        </ScrollView>
      ) : (
        <PretendardText style={styles.noTag}>태그가 없습니다.</PretendardText>
      )}
    </View>
  );
};

export default TagSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTag: {
    color: Colors.primary,
    fontSize: 32,
  },
});
