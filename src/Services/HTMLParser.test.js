import HTMLParser from './HTMLParser';

let mocki = 0;
jest.mock('uuid/v4', () => () => 'uuid' + mocki++);

describe('HTMLParser', () => {
  it('should do things', () => {
    const template = `
    <table>
	<tbody><tr>
		<td>
			<img src="https://suilabs.s3.eu-west-3.amazonaws.com/firmas/SG_tomas.jpg">
		</td>
	</tr>
	<tr>
		<td>
			<a href="mailto:tomas.guinovart@renalyse.com" style="text-decoration: none; color: #DF6546; font-family: Roboto, Verdana, Sans-serif; font-size: 1rem;">
				tomas.guinovart@renalyse.com
			</a>
		</td>
	</tr>
	<tr>
		<td>
			<a style="text-decoration: none; color: #DF6546; font-family: Roboto, Verdana, Sans-serif; font-size: 1rem;" href="http://www.renalyse.com">
				www.renalyse.com
			</a>
		</td>
	</tr>
</tbody></table>
`;
    const parser = new HTMLParser({
      "a": {
        "id": "title",
        "params": [
          "href",
          "innerHTML"
        ]
      },
      "img": {
        "id": "alt",
        "params": [
          "src"
        ]
      }
    });
    const parserResult = parser.parseContent(template);
    expect(parserResult.html).toEqual(expect.any(String));
    expect(parserResult.fields.length).toEqual(5);
    expect(parserResult.fields[0].tag).toEqual('img');
    expect(parserResult.fields[1].tag).toEqual('a');
    expect(parserResult.fields[2].tag).toEqual('a');
    expect(parserResult.fields[3].tag).toEqual('a');
    expect(parserResult.fields[4].tag).toEqual('a');
  });
});