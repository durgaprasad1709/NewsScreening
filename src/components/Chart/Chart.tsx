// components/MermaidChart.js
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Box, ScrollArea } from '@mantine/core';

const Chart = ({ chart }: { chart: string }) => {
  const mermaidRef = useRef(null);

  useEffect(() => {
    const mermaidElement = document.getElementById('mermaid');

    mermaidElement?.removeAttribute('data-processed');

    if (mermaidRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        flowchart: {
          // useMaxWidth: true,
          htmlLabels: true,
        },
        securityLevel: 'loose',
      });

      window.callback = async function (e) {
        if (e && e != '') {
          console.log('triggered callback');
          // const element = e.target as HTMLElement;
          alert('clicked on iPhone4'); // Display the text content of the clicked element
          // alert('triggered callback',e.textCo);
        }
      };

      mermaid.contentLoaded();
    }
  }, [chart]);

  // useEffect(() => {
  //   const handleClick = (e: Event) => {
  //     const element = e.target as HTMLElement;
  //     alert(element.textContent); // Display the text content of the clicked element
  //   };

  //   const mainElements = document.querySelectorAll('.main');
  //   mainElements.forEach((element) => {
  //     element.addEventListener('click', handleClick);
  //   });
  //   console.log({ mainElements });

  //   // Cleanup event listeners on component unmount
  //   return () => {
  //     mainElements.forEach((element) => {
  //       element.removeEventListener('click', handleClick);
  //     });
  //   };
  // }, [chart]);

  return (
    <ScrollArea h={'100%'} scrollbarSize={5}>
      <Box ref={mermaidRef} id='mermaid' className='mermaid' mb='lg'>
        {chart}
      </Box>
    </ScrollArea>
  );
};

export default Chart;
