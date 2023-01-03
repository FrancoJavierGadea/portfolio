import EChartsReact from "echarts-for-react";
import styled from "styled-components";


const StyledDiv = styled.div`

    width: fit-content;

    .Chart-container {
    
        position: relative;
        pointer-events: none;
        
        width: 120px;
        height: 120px;
    }
    .Logo {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .Logo img {
        width: 50px;
        height: 50px;
        object-fit: scale-down;
    }
`;

function SkillChart({name, logo, value = 80}) {

    const option = {
        series: [
          {
            type: 'pie',

            radius: ['90%', '70%'],

            label: { show: false },

            emphasis: { disabled: true },

            data: [
              { value: value, itemStyle: {color: '#2015b4'} },
              { value: 100 - value, itemStyle: {color: '#777'} },
            ]
          }
        ]
    };

    return (<StyledDiv title={`${value}%`}>
        <div className="Chart-container">

            <EChartsReact option={option} style={{width: '100%', height: '100%'}}></EChartsReact>
            <div className="Logo">
                <img src={logo} alt={name + ' logo'} />
            </div>
        </div>

        <h6 className="p-0 text-center">{name}</h6>

    </StyledDiv>);
}

export default SkillChart;