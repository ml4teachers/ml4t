function Number({ value, current }) {
    const colors = {
      '-3': 'bg-orange-300',
      '-2': 'bg-orange-200',
      '-1': 'bg-orange-100',
      '0':  'bg-white',
      '1':  'bg-blue-100',
      '2':  'bg-blue-200',
      '3':  'bg-blue-300'
    }
    const currentColor = colors[value.toString()]
    return (
      <div className={`number ${currentColor} w-8 h-8 flex justify-center items-center border border-gray-300`}>
        {value}
      </div>
    )
  }

export default Number;