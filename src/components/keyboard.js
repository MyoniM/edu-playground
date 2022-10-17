import { useState } from 'react';

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

export default function KeyboardLayout({ editorView }) {
  const [state, setState] = useState({
    clickedParent: '',
    lastClicked: '',
  });

  const parentLayout = {
    default: [
      siblings[state.clickedParent] ?? '',
      'ሀ ለ ሐ መ ሠ ረ ሰ ሸ ቀ በ ቨ [ ] < > |',
      'ተ ቸ ኀ ነ ኘ አ ከ ኸ ወ ዐ ዘ ዠ : " {enter}',
      'የ ደ ጀ ገ ጠ ጨ ጰ ጸ ፀ ፈ ፐ . / =',
      '( ) {space} { } _',
    ],
  };

  const onKeyPress = (button) => {
    if (siblings.hasOwnProperty(button)) {
      setState((prev) => ({ ...prev, clickedParent: button }));
    }
    // first parent click wont write
    if (state.lastClicked === button || !siblings.hasOwnProperty(button)) {
      editorView.dispatch({
        changes: { from: editorView.state.doc.length, insert: getValue(button) },
      });
    } else {
      setState((prev) => ({ ...prev, lastClicked: button }));
    }
  };

  return <Keyboard layout={parentLayout} onKeyPress={onKeyPress} />;
}

const getValue = (button) => {
  switch (button) {
    case '{space}':
      return ' ';
    case '{enter}':
      return '\n';

    default:
      return button;
  }
};

const siblings = {
  ሀ: 'ሀ ሁ ሂ ሃ ሄ ህ ሆ',
  ለ: 'ለ ሉ ሊ ላ ሌ ል ሎ ሏ',
  ሐ: 'ሐ ሑ ሒ ሓ ሔ ሕ ሖ ሗ',
  መ: 'መ ሙ ሚ ማ ሜ ም ሞ ሟ',
  ሠ: 'ሠ ሡ ሢ ሣ ሤ ሥ ሦ ሧ',
  ረ: 'ረ ሩ ሪ ራ ሬ ር ሮ ሯ',
  ሰ: 'ሰ ሱ ሲ ሳ ሴ ስ ሶ ሷ',
  ሸ: 'ሸ ሹ ሺ ሻ ሼ ሽ ሾ ሿ',
  ቀ: 'ቀ ቁ ቂ ቃ ቄ ቅ ቆ ቇ',
  በ: 'በ ቡ ቢ ባ ቤ ብ ቦ ቧ',
  ቨ: 'ቨ ቩ ቪ ቫ ቬ ቭ ቮ ቯ',
  ተ: 'ተ ቱ ቲ ታ ቴ ት ቶ ቷ',
  ቸ: 'ቸ ቹ ቺ ቻ ቼ ች ቾ ቿ',
  ኀ: 'ኀ ኁ ኂ ኃ ኄ ኅ ኆ ኇ',
  ነ: 'ነ ኑ ኒ ና ኔ ን ኖ ኗ',
  ኘ: 'ኘ ኙ ኚ ኛ ኜ ኝ ኞ ኟ',
  አ: 'አ ኡ ኢ ኣ ኤ እ ኦ ኧ',
  ከ: 'ከ ኩ ኪ ካ ኬ ክ ኮ ኯ',
  ኸ: 'ኸ ኹ ኺ ኻ ኼ ኽ ኾ',
  ወ: 'ወ ዉ ዊ ዋ ዌ ው ዎ',
  ዐ: 'ዐ ዑ ዒ ዓ ዔ ዕ ዖ',
  ዘ: 'ዘ ዙ ዚ ዛ ዜ ዝ ዞ ዟ',
  ዠ: 'ዠ ዡ ዢ ዣ ዤ ዥ ዦ ዧ',
  የ: 'የ ዩ ዪ ያ ዬ ይ ዮ ዯ',
  ደ: 'ደ ዱ ዲ ዳ ዴ ድ ዶ ዷ',
  ጀ: 'ጀ ጁ ጂ ጃ ጄ ጅ ጆ ጇ',
  ገ: 'ገ ጉ ጊ ጋ ጌ ግ ጎ ጏ',
  ጠ: 'ጠ ጡ ጢ ጣ ጤ ጥ ጦ ጧ',
  ጨ: 'ጨ ጩ ጪ ጫ ጬ ጭ ጮ ጯ',
  ጰ: 'ጰ ጱ ጲ ጳ ጴ ጵ ጶ ጷ',
  ጸ: 'ጸ ጹ ጺ ጻ ጼ ጽ ጾ ጿ',
  ፀ: 'ፀ ፁ ፂ ፃ ፄ ፅ ፆ ፇ',
  ፈ: 'ፈ ፉ ፊ ፋ ፌ ፍ ፎ ፏ',
  ፐ: 'ፐ ፑ ፒ ፓ ፔ ፕ ፖ ፗ',
};
